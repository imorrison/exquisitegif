Exquisitegif::Application.routes.draw do
  devise_for :users

  root to: 'animations#index'

  resources :animations do 
    resource :frame, only: [:create, :show]
  end
end
