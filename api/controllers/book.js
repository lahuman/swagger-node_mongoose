const logger = require(`${__basedir}/config/winston`);
const Book = require(`${__basedir}/models/Book`);


const getBookList = async (req, res, next) => {
  try{
    res.json(await Book.find({}));
  }catch(err){
    logger.error(err);
    next(err);
  }
}
const getBook = async (req, res, next) => {
  try{
    let id = req.swagger.params.id.value;
    const result = await Book.findOne({_id:id});
    res.json(result);
  }catch(err){
    logger.error(err);
    next(err);
  }
}
const addBook = async (req, res, next) => {
  try{
    await __addBookInfo(req);
    res.status(201).end();
  }catch(err){
    logger.error(err);
    next(err);
  } 
}
const removeeBook = async (req, res, next) => {
  try{
    let id = req.swagger.params.id.value;
    await Book.deleteOne({_id:id});
    res.status(204).end();
  }catch(err){
    logger.error(err);
    next(err);
  }
}
const modifyBook = async (req, res, next) => {
  try{
    let params = req.swagger.params.body.value;
    await Book.updateOne({_id: params._id}, params);
    res.status(200).end();
  }catch(err){
    logger.error(err);
    next(err);
  }
}

const __addBookInfo = async (req) => {
  let params = req.swagger.params.body.value;
  await new Book({...params}).save();
}

module.exports = {
  getBookList,
  getBook,
  addBook,
  removeeBook,
  modifyBook
};


