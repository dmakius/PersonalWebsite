Rails.application.routes.draw do
 # meme Routes
  get 'memes/all' => 'memes#all'
  # get 'memes/' => 'memes#all'
  resources :memes

  #the Home Page
  root 'welcome#index'

  get 'newsfeed/index'
  get 'newsfeed/show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  #Blog Routes
  resources :posts
  resources :categories
  resources :contacts
  resources :pictures
  resources :sketches
  resources :memecategories

  resources :gamescores

  get 'weather' => 'welcome#weather'
  get 'contact/index'



  #picture Routes
  get 'pictures/sketches'
  get 'pictures/pics'

  #Resume Routes
  get '/english' => 'welcome#english'
  get '/hebrew' => 'welcome#hebrew'

  #game routes
  get '/snake' => 'welcome#snake'
  get '/breakout' => 'welcome#breakout'
  get '/pong' => 'welcome#pong'
  get '/mmrunner' => 'welcome#mmrunner'
  get '/tetris' => 'welcome#tetris'
  get '/verticalmario' => 'welcome#verticalmario'

  get '/asteroids' => 'welcome#asteroids'
  get '/asteroids2' => 'welcome#asteroids2'

  get '/translate' => 'welcome#translate'

  get 'welcome/home'
  get 'home/download_pdf'
  match '/send_mail', to: 'contact#send_mail', via: 'post'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"


  end
