Rails.application.routes.draw do
  
  get '/home', to: 'application#home'

  get '/get', to: 'application#getter'

  get '/teams', to: 'application#teams'

end
