class Layout::AccountMenuComponent < ApplicationComponent; end

require_dependency Rails.root.join("app", "components", "layout", "account_menu_component").to_s

class Layout::AccountMenuComponent
  attr_reader :user

  def initialize(user)
    @user = user
  end
end