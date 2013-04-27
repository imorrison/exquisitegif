class AnimationsController < ApplicationController
  def index
  end

  def create
    @animation = Animation.build(params[:animation])
    
    if @animation.save
      render json: @animation
    else
      render json: @animation.errors.full_messages, status: 422
    end
  end
end
