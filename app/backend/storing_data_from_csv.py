import pandas
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('sqlite:///profiles_dbase.sqlite', echo=False)

Base = declarative_base()

class Profiles(Base):
    __tablename__ = 'profiles'
    __table_args__ = {'autoload': True}

    profile_id = Column(Integer, primary_key=True)
    username = Column(String)
    name = Column(String)
    email = Column(String)
    repo_count = Column(Integer)
    company = Column(String)
    avatar_url = Column(String)
    hireable = Column(String)
    star_time = Column(String)

    def __repr__(self):
        return format(self.username, self.name, self.email, self.repo_count, self.company, self.avatar_url, self.hireable, self.star_time)

Base.metadata.create_all(engine)

file_name = 'profiles.csv'
    
df = pandas.read_csv(file_name)

df.to_sql(con = engine, name=Profiles.__tablename__, if_exists='append', index=False)

session = sessionmaker()
session.configure(bind=engine)
s = session()

results = s.query(Profiles).limit(10).all()
for r in results:
    print(r)


    