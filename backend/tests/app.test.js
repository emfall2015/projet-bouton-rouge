// supertest en complément de jest qui permet d'envoyer des requêtes http a mon application express gateway
const request = require("supertest");

const app = require("../server");

describe("POST /login", () => {
  // Test pour les identifiants correctes
  test("retourne 200 avec les bons identifiants", async () => {
    const response = await request(app).post("/login").send({ username: "admin", password: "docker" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Bienvenue. Et surtout, ne touche pas au bouton."
    );
  });

  // Test pour les identifiants incorrectes
  test("retourne 401 avec un mauvais mot de passe", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        password: "wrong"
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      message: "Identifiants incorrects."
    });
  });

  // Test pour les identifiants non renseignés
  test("retourne 401 si les identifiants sont absents", async () => {
    const response = await request(app)
      .post("/login")
      .send({});

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});


describe("POST /click", () => {
// Vérifier les valeurs valides (1, 15, 29) par exemple ;
  test.each([1, 15, 29])(
    "accepte count = %i",
    async (count) => {
      const response = await request(app)
        .post("/click")
        .send({ count });

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(count);
      expect(response.body.message).toBeDefined();
      expect(response.body.finished).toBe(false);
    }
  );

  // le comportement spécial lorsque count === 30.
  test("retourne finished: true lorsque count vaut 30", async () => {
    const response = await request(app)
      .post("/click")
      .send({ count: 30 });

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(30);
    expect(response.body.message).toBeDefined();
    expect(response.body.finished).toBe(true);
  });

  // Vérifier les valeurs invalides (0, 31, un nombre décimal, une chaine de caractéres) ;
  test.each([0, -1, 31, 100, 1.5, "5", null, undefined])(
    "rejette count = %s",
    async (count) => {
      const response = await request(app)
        .post("/click")
        .send({ count });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error:
          "Le nombre de clics doit être compris entre 1 et 30."
      });
    }
  );

  test("rejette un corps vide", async () => {
    // l'absence de count 
    const response = await request(app)
      .post("/click")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Le nombre de clics doit être compris entre 1 et 30."
    );
  });
});
