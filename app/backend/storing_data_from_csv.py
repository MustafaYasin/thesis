import pandas
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('sqlite:///profiles.db', echo=False)

Base = declarative_base()

class Profiles(Base):
    __tablename__ = 'profiles'

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
        return '''<Profiles(profile_id='{0}', username='{1}', name='{2}', email='{3}', repo_count='{4}', company='{5}', avatar_url='{6}', hireable='{7}', star_time='{8}')>'''.format(self.profile_id, self.username, self.name, self.email, self.repo_count, self.company, self.avatar_url, self.hireable, self.star_time)

Base.metadata.create_all(engine)



file_name = 'csv_folder/pytorch_pytorch.csv'
print(file_name)

df = pandas.read_csv(file_name)

df.to_sql(con = engine, name=Profiles.__tablename__, if_exists='append', index=False)

session = sessionmaker()
session.configure(bind=engine)
s = session()



results = s.query(Profiles).limit(10).all()
for r in results:
    print(r)


    