Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  match "/cable", :to => ActionCable.server, via: [:get, :post]
  root 'users#new'

  get    'account_activation',  to: 'users#account_activation', :defaults => { :format => 'json' }
  get    'password_reset',      to: 'users#password_reset', :defaults => { :format => 'json' }
  post   'edit_pass',           to: 'users#edit_pass', :defaults => { :format => 'json' }
  post   'search',              to: 'users#search', :defaults => { :format => 'json' }
  post   'set',                 to: 'posts#get_next', :defaults => { :format => 'json' }
  get    'search',              to: 'users#index', :defaults => { :format => 'json' }
  post   'add_friend',          to: 'users#create_friend', :defaults => { :format => 'json' }
  delete 'delete_friend',       to: 'users#destroy_friend', :defaults => { :format => 'json' }
  get    '/login',              to: 'sessions#new', :defaults => { :format => 'json' }
  get    '/start',              to: 'users#start', :defaults => { :format => 'json' }
  post   '/login',              to: 'sessions#create', :defaults => { :format => 'json' }
  delete '/logout',             to: 'sessions#destroy', :defaults => { :format => 'json' }
  post   '/rating',             to: 'users#rating', :defaults => { :format => 'json' }
  resources :users, :defaults => { :format => 'json' } do
    resources :images
    resources :posts
    resources :comments
    resources :messages
    patch :friends, on: :member
    get :friends, on: :member
    get :followers, on: :member
  end
end
