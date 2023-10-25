class WelcomeController < ApplicationController
  include RemotelyTranslatable

  skip_authorization_check
  before_action :set_user_recommendations, only: :index, if: :current_user
  before_action :authenticate_user!, only: :welcome

  layout "devise", only: :welcome

  def index
    @header = Widget::Card.header.first
    @feeds = Widget::Feed.active
    @cards = Widget::Card.body

    # Obtén los 8 debates limitados
    @limited_debates = Debate.limit(5)
    @limited_proposals = Proposal.where.not(published_at: nil).limit(5).order(id: :asc)

    
    user_agent = request.user_agent.downcase
    if user_agent.include?("mobile") || user_agent.include?("android")
      @debate_group_count = 1
      @proposal_group_count = 1
    else
      @proposal_group_count = 3
      @debate_group_count = 3
    end

    @remote_translations = detect_remote_translations(@feeds,
                                                      @recommended_debates,
                                                      @recommended_proposals)
  end

  def indexTuPropones
    render 'tu_propones'
  end

  def welcome
    if current_user.level_three_verified?
      redirect_to page_path("welcome_level_three_verified")
    elsif current_user.level_two_or_three_verified?
      redirect_to page_path("welcome_level_two_verified")
    else
      redirect_to page_path("welcome_not_verified")
    end
  end

  private

    def set_user_recommendations
      @recommended_debates = Debate.recommendations(current_user).sort_by_recommendations.limit(3)
      @recommended_proposals = Proposal.recommendations(current_user).sort_by_recommendations.limit(3)
    end

    def resource_model
      Debate
      Proposal
    end
end
