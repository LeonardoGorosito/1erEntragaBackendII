const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt']; // Asegúrate de que el nombre de la cookie sea el mismo que en tu proyecto
  }
  return token;
};

export default cookieExtractor;
