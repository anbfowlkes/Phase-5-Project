require 'json'

puts "Destroying previous TeamGame data"
TeamGame.destroy_all





17.times do |i|

        week = i + 1

        def get_data(week)
                domain = "https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/#{week}"
                url = URI.parse(domain)
                req = Net::HTTP::Get.new(url.request_uri)
                req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
                http = Net::HTTP.new(url.host, url.port)
                http.use_ssl = (url.scheme == "https")
                response = http.request(req)
                puts response
                data = JSON.parse(response.body)
                # render json: data
                return data
        end

        weekly_data = get_data(week)

        weekly_data.each do |item|
                new_item = TeamGame.create!(team: item["Team"], week: week, info: item)
        end
end


# ##### -----------------------------Week 1--------------------------------- #####

# def week1
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/1'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week1data = week1()

# week1data.each do |item|
#         # puts item
#         # puts item.keys
#         puts item["Team"]
#         # parsed = JSON.parse(item)
#         # puts parsed
#         new_item = TeamGame.create!(team: item["Team"], week: 1, info: item)
#         # puts new_item
# end


# ##### -------------------------Week 2------------------------------------- #####

# def week2
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/2'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week2data = week2()

# week2data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 2, info: item)
# end

# ##### --------------------------Week 3------------------------------------ #####

# def week3
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/3'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week3data = week3()

# week3data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 3, info: item)
# end

# ##### ------------------------Week 4-------------------------------------- #####

# def week4
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/4'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week4data = week4()

# week4data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 4, info: item)
# end

# ##### -------------------------Week 5------------------------------------- #####

# def week5
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/5'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week5data = week5()

# week5data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 5, info: item)
# end

# ##### --------------------------Week 6------------------------------------ #####

# def week6
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/6'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week6data = week6()

# week6data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 6, info: item)
# end

# ##### ----------------------------Week 7---------------------------------- #####

# def week7
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/7'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week7data = week7()

# week7data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 7, info: item)
# end

# ##### ------------------------Week 8-------------------------------------- #####

# def week8
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/8'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week8data = week8()

# week8data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 8, info: item)
# end

# ##### -------------------------Week 9------------------------------------- #####

# def week9
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/9'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week9data = week9()

# week9data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 9, info: item)
# end

# ##### ------------------------Week 10-------------------------------------- #####

# def week10
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/10'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week10data = week10()

# week10data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 10, info: item)
# end

# ##### -------------------------Week 11------------------------------------- #####

# def week11
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/11'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week11data = week11()

# week11data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 11, info: item)
# end

# ##### -------------------------Week 12------------------------------------- #####

# def week12
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/12'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week12data = week12()

# week12data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 12, info: item)
# end

# ##### -------------------------Week 13------------------------------------- #####

# def week13
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/13'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week13data = week13()

# week13data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 13, info: item)
# end

# ##### -----------------------Week 14--------------------------------------- #####

# def week14
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/14'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week14data = week14()

# week14data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 14, info: item)
# end

# ##### -----------------------Week 15--------------------------------------- #####

# def week15
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/15'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week15data = week15()

# week15data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 15, info: item)
# end

# ##### ----------------------Week 16---------------------------------------- #####

# def week16
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/16'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week16data = week16()

# week16data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 16, info: item)
# end

# ##### ----------------------Week 17---------------------------------------- #####

# def week17
#         domain = 'https://api.sportsdata.io/api/nfl/odds/json/TeamGameStats/2021/17'
#         url = URI.parse(domain)
#         req = Net::HTTP::Get.new(url.request_uri)
#         req['Ocp-Apim-Subscription-Key'] = '797a23a594b741bdb4bef10b93b7e3a0'
#         http = Net::HTTP.new(url.host, url.port)
#         http.use_ssl = (url.scheme == "https")
#         response = http.request(req)
#         puts response
#         data = JSON.parse(response.body)
#         # render json: data
#         return data
# end

# week17data = week17()

# week17data.each do |item|
#         new_item = TeamGame.create!(team: item["Team"], week: 17, info: item)
# end
