
const notFound = (req, res, next) => {
   const error = new Error(`Not Found - ${req.originalURL}`);
   error.status = 404;
   next(error);
};

export default notFound;

