Exquisitegif::Application.routes.draw do
  root to: 'animations#index'

  resources :animations
end
