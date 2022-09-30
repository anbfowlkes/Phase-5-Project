Rails.application.routes.draw do
  
  get '/home', to: 'application#home'

  get '/get', to: 'application#getter'

  get '/teams', to: 'application#teams'

  get '/profile-graphs', to: 'developerprofiles#graphs'

  post '/profile-graphs', to: 'developerprofiles#addgraph'

end
