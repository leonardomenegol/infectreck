from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Hospital(Base):
    __tablename__ = 'hospitais'
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    cidade = Column(String)
    estado = Column(String)

class Unidade(Base):
    __tablename__ = 'unidades'
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    hospital_id = Column(Integer, ForeignKey('hospitais.id'))

class Setor(Base):
    __tablename__ = 'setores'
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    unidade_id = Column(Integer, ForeignKey('unidades.id'))

class Leito(Base):
    __tablename__ = 'leitos'
    id = Column(Integer, primary_key=True)
    setor_id = Column(Integer, ForeignKey('setores.id'))
    codigo = Column(String)
    paciente_nome = Column(String)
    idade = Column(Integer)
    sexo = Column(String)

class Coleta(Base):
    __tablename__ = 'coletas'
    id = Column(Integer, primary_key=True)
    leito_id = Column(Integer, ForeignKey('leitos.id'))
    data = Column(Date)
    bacteria = Column(String)
    resistencia = Column(String)
    sitio_coleta = Column(String)

class Alerta(Base):
    __tablename__ = 'alertas'
    id = Column(Integer, primary_key=True)
    setor_id = Column(Integer, ForeignKey('setores.id'))
    bacteria = Column(String)
    nivel = Column(String)
    data = Column(Date)
    tipo_alerta = Column(String)
