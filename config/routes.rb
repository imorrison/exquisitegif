Exquisitegif::Application.routes.draw do
  root to: "animations#index"

  devise_for :users

  match 'home' => 'static_pages#index'

  resources :animations do 
    resource :frame, only: [:create, :show]
  end

  match 'buildgif/:id' => 'animations#build_gif', via: [:post]
end
