class FramesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @frame = Frame.new(
      data_url: params[:data_url],
      animation_id: params[:animation_id],
      user_id: 1 # will need to be the current user
      )

    if @frame.save
      render json: @frame
    else
      render json: @frame.errors.full_messages, status: 422
    end
  end
end
