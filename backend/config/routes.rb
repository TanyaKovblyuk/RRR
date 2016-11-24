Rails.application.routes.draw do
  root 'users#new'

  get    'account_activation',  to: 'users#account_activation'
  get    'password_reset',      to: 'users#password_reset'
  post   'edit_pass',           to: 'users#edit_pass'
  post   'search',              to: 'users#search'
  post   'set',                 to: 'posts#add_next'
  get    'search',              to: 'users#index'
  post   'add_friend',          to: 'users#create_friend'
  delete 'delete_friend',       to: 'users#destroy_friend'
  get    '/login',              to: 'sessions#new'
  post   '/login',              to: 'sessions#create', :defaults => { :format => 'json' }
  delete '/logout',             to: 'sessions#destroy'
  resources :users do
    resources :posts do
      post "like", on: :member
      post "dislike", on: :member
    end
    resources :images
    resources :comments
    resources :messages
    patch :friends, on: :member
    get :friends, on: :member
  end
end
