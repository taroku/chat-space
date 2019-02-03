Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'messages#index'
  get 'messages' => 'messages#index' #サインイン後、トップ（チャット画面）
  post 'messages/new' => 'messages#new'
end
