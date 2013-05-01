class AnimationsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @animations = Animation.includes(:gif_container)
                           .where("owner_id = ?", current_user.id)
    
    respond_to do |format|
      format.html
      format.json { render json: @animations }
    end
  end

  def create
    @animation = Animation.new(params[:animation])
    @animation.owner_id = current_user.id
    
    if @animation.save
      render json: @animation
    else
      render json: @animation.errors.full_messages, status: 422
    end
  end

  def build_gif
    @animation = Animation.find(params[:id])

    @animation.delay.build_gif
    
    render json: @animation
  end
end
