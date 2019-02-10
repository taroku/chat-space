Rails.application.routes.draw do
  # get 'users/:id/edit' => 'users#edit'

  # get 'users/update'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'messages#index'
  resources :users, only: [:edit, :update]
  get 'messages' => 'messages#index' #サインイン後、トップ（チャット画面）
  post 'messages/new' => 'messages#new'
end
