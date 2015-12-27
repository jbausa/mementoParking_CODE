# https://gist.github.com/suryart/7418454
module ApplicationHelper
  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-error", alert: "alert-warning", notice: "alert-info" }[flash_type.to_sym] || flash_type.to_s
end

  def flash_messages(opts = {})
    #flash.except(:timedout).each do |msg_type, message|
    flash.each do |msg_type, message|
      if message != true
        concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type)} fade in", style: "margin-top:10px;") do 
                concat content_tag(:button, 'x', class: "close", data: { dismiss: 'alert' })
                concat message 
              end)
      end
    end
    nil
  end
end