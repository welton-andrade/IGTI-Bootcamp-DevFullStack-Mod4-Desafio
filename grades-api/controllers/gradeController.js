import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import {studentModel} from '../models/studentModel.js';

const create = async (req, res) => {
  try {
    const student = studentModel(req.body);
    await student.save();
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
    logger.info(`GET /grade`);
  } catch (error) {
    res.status(500).send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    const student = await studentModel.find({_id: id});
    res.send(student);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await studentModel.findByIdAndUpdate({_id: id}, req.body, {new: true}); 
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  const student = await studentModel.findByIdAndDelete({_id: id});
  
  try {
    if(!student)
      res.status(400).send('Documento não encontrado na coleção');
    res.send(200).send();
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    //studentModel.remove({}); //pode utilizar isso aqui tbm
    studentModel.deleteMany({});
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
