require 'rest_client'
require 'json'
require 'net/http'

class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    include ActionController::Cookies

    before_action :authorized

    # def home
    #     render json: { hello: "world" }
    # end

    def getter
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        url = URI.parse(domain)
        req = Net::HTTP::Get.new(url.request_uri)
        req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        response = http.request(req)
        puts response
        data = JSON.parse(response.body)
        render json: data
    end

    def teams
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Teams'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        url = URI.parse(domain)
        req = Net::HTTP::Get.new(url.request_uri)
        req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        response = http.request(req)
        puts response
        data = JSON.parse(response.body)
        render json: data
    end

    def new
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021'
        domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        url = URI.parse(domain)
        req = Net::HTTP::Get.new(url.request_uri)
        req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        response = http.request(req)
        puts response
        data = JSON.parse(response.body)
        render json: data
    end

    def all
        domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        url = URI.parse(domain)
        req = Net::HTTP::Get.new(url.request_uri)
        req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        response = http.request(req)
        puts response
        data = JSON.parse(response.body)
        render json: data
    end

    def week1
        domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/1'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        url = URI.parse(domain)
        req = Net::HTTP::Get.new(url.request_uri)
        req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = (url.scheme == "https")
        response = http.request(req)
        puts response
        data = JSON.parse(response.body)
        render json: data
    end

    def encode_token(payload)
        JWT.encode(payload, 'my_s3cr3t')
    end

    def auth_header
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
        begin
            JWT.decode(token, 'mys3cr3t', true, algorithm: 'HS256')
        rescue JWT::DecodeError
            nil
        end
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end
