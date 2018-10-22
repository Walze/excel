


-- linhas

INSERT INTO `linha` (`nome`) VALUES
  ('CVs Recebidos'),
  ('Fora do Perfil'),
  ('Dentro Perfil'),
  ('Sem Interesse'),
  ('Não Atenderam'),
  ('Convocados'),
  ('Presentes'),
  ('Desistiu após '),
  ('Aprovados'),
  ('Faltosos'),
  ('Falta de documento'),
  ('Desistentes'),
  ('Reprovados');



-- grupos

INSERT INTO `grupo` (`nome`) VALUES
('Triagem'),
('Contato'),
('Entrevista'),
('Prova'),
('Serasa'),
('Conversa Final');



-- relacoes

INSERT INTO `grupo_linha` (`grupo_id`, `linha_id`) VALUES
('1', '1'),
('1', '2'),
('1', '3'),
('2', '4'),
('2', '5'),
('2', '6'),
('3', '10'),
('3', '7'),
('3', '12'),
('3', '13'),
('3', '9'),
('3', '8'),
('4', '10'),
('4', '7'),
('4', '13'),
('4', '9'),
('5', '13'),
('5', '9'),
('6', '11'),
('6', '7'),
('6', '10'),
('6', '12'),
('6', '13'),
('6', '9');



-- vagas

INSERT INTO `vaga` (`nome`) VALUES
('Assessor de Midia'),
('Programador');
