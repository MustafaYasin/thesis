from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient


app = Flask(__name__, static_url_path='/static')
CORS(app)
api = Api(app)

class RecommendCoFounder(Resource):
    def get(self):
        query_param_parser = reqparse.RequestParser()
        query_param_parser.add_argument('username', location='args', type=str, required=True)
        args = query_param_parser.parse_args()
        username = args['username']

        client = MongoClient("mongodb+srv://mustafa:mustafa@cluster0.jzvhgwl.mongodb.net/?retryWrites=true&w=majority")
        db = client['profile']
        real_profile_db = db['real_user']

        result = real_profile_db.find_one({'Username': username}, {'_id': 0, 'recommendations': 1})
        if not result:
            return {'message': 'User not found'}, 404
        print(result)
        self_recommendation_value = result['recommendations']
        lower_range = self_recommendation_value - 10
        upper_range = self_recommendation_value + 10

        recommended_users = real_profile_db.find({'recommendations': 
                                    {'$gte': lower_range, '$lte': upper_range}
                            },
                            {'_id': 0}
                            ).sort('recommendations', -1)
        recommended_users = list(recommended_users)
        return {'recommended_users': recommended_users}, 200


api.add_resource(RecommendCoFounder, '/recommend')
        

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
