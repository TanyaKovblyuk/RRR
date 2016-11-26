Rails.application.routes.draw do
  root 'users#new'

  get    'account_activation',  to: 'users#account_activation', :defaults => { :format => 'json' }
  get    'password_reset',      to: 'users#password_reset', :defaults => { :format => 'json' }
  post   'edit_pass',           to: 'users#edit_pass', :defaults => { :format => 'json' }
  post   'search',              to: 'users#search', :defaults => { :format => 'json' }
  post   'set',                 to: 'posts#add_next', :defaults => { :format => 'json' }
  get    'search',              to: 'users#index', :defaults => { :format => 'json' }
  post   'add_friend',          to: 'users#create_friend', :defaults => { :format => 'json' }
  delete 'delete_friend',       to: 'users#destroy_friend', :defaults => { :format => 'json' }
  get    '/login',              to: 'sessions#new', :defaults => { :format => 'json' }
  post   '/login',              to: 'sessions#create', :defaults => { :format => 'json' }
  delete '/logout',             to: 'sessions#destroy', :defaults => { :format => 'json' }
  resources :users, :defaults => { :format => 'json' } do
    resources :posts do
      post "like", on: :member
      post "dislike", on: :member
    end
    resources :images
    resources :comments
    resources :messages
    patch :friends, on: :member
    get :friends, on: :member
    get :propose, on: :member
  end
end
