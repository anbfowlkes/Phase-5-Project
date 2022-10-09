Rails.application.routes.draw do
  
  get '/home', to: 'application#home'

  get '/get', to: 'application#getter'

  get '/teams', to: 'application#teams'

  get '/profile-graphs', to: 'developerprofiles#graphs'

  post '/profile-graphs', to: 'developerprofiles#addgraph'

  delete '/profile-graphs/:id', to: 'developerprofiles#destroy'

  get '/new', to: 'application#new'

  get '/all', to: 'application#all'

  get '/week1', to: 'application#week1'

  get '/teamgames', to: 'teamgames#show'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
