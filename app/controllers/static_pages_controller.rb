class StaticPagesController < ApplicationController
	before_filter :authenticate_user!, :except => [:home, :about, :help]
  def home
  end

  def help
  end

  def about
  end

  def maps
  end
end
