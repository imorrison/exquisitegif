class AnimationsController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
  
  def index
  end

  def create
    @animation = Animation.new(params[:animation])
    @animation.owner_id = 1 # will need to be current_user
    
    if @animation.save
      render json: @animation
    else
      render json: @animation.errors.full_messages, status: 422
    end
  end
end
