Rails.application.routes.draw do

 
     get 'contact/index'

  get 'pictures/sketches'

  get 'pictures/pics'

  resources :posts do
      resources :categories
  end
  get 'resume/english'

  get 'resume/hebrew'

  get 'games/snake'

  get 'games/breakout'

  get 'games/pong'

  get 'welcome/home'
  
  get 'home/download_pdf'
  
  get '/pong', :to => 'pages#pong'
  get '/snake', :to => 'pages#snake'
  get '/breakout', :to => 'pages#breakout'
  
  get '/english', :to => 'pages#english'
  get '/hebrew', :to => 'pages#hebrew'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  end
