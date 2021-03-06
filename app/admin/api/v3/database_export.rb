ActiveAdmin.register_page 'Database Export' do
  menu parent: 'Database', priority: 1

  content do
    database_versions = Api::V3::S3ObjectList.instance.call({})
    keys = database_versions.map { |n| n[:key] }.uniq

    database_versions.keep_if { |v| v[:key].eql? params[:key] } if params[:key].present?

    render partial: 'admin/database_export/form', locals: {
      database_versions: database_versions,
      keys: keys
    }
  end

  page_action :call, method: :post do
    @job_id = DatabaseExportWorker.perform_async
    notice = "Database export #{@job_id} scheduled. Please check status using \
the background job monitor."
    redirect_to admin_database_export_path, notice: notice
  end
end
