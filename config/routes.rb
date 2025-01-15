Rails.application.routes.draw do
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
    end
  end

  get '/*path' => 'pages#home'
end
