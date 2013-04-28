Exquisitegif::Application.routes.draw do
  root to: 'animations#index'

  resources :animations do 
    resource :frame, only: [:create]
  end
end
