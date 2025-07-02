const DefaultApiController = async (request, reply) => {
  const version = process.env.VERSION || "1.0.0";
  const data = {
    name: "Swaranga API",
    version,
  };

  return reply.send(data);
};

const Controller = (app, _, done) => {
  app.get("/", DefaultApiController);
  done();
};

export default Controller;
