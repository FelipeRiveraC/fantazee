Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  get 'pages/home'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home"

  namespace :api do
    namespace :v1 do
      resources :engagements, only: [:index, :edit, :update, :show]
      resources :users, only: [:create, :show] do
        collection do
          post 'login'
        end
      end
      resources :travels, only: [:index, :create, :update, :destroy, :show] do
        resources :travel_chats, only: [:index, :create], controller: 'travel_chats'
        resources :travel_evaluations, only: [:index, :create, :update, :destroy]
        member do
          post 'request', to: 'travels#create_request'
        end
        patch 'requests/:travel_request_id/update_request', to: 'travels#update_request', as: :update_request
      end
      resources :players, only: [:index, :show] do
        member do
          get :statistics
          get :accumulated_statistics
        end
        collection do
          get :search
        end
      end
      resources :draft_teams do
        member do
          post 'add_player'
          delete 'remove_player/:player_id', action: :remove_player, as: :remove_player
        end
        collection do
          get :my_teams
        end
      end
      resources :player_statistics, only: [:index] do
        collection do
          get :live
        end
      end
    end
  end

  get '/*path' => 'pages#home'
end
