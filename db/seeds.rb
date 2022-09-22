def getter
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Players'
        domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamSeasonStats/2021'
        domain = 'https://api.sportsdata.io/api/nfl/odds/json/Scores/2021'
        # domain = 'https://api.sportsdata.io/api/nfl/fantasy/json/Byes/2021'
        # domain = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2021/10/20'
        # uri = URI(url)
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