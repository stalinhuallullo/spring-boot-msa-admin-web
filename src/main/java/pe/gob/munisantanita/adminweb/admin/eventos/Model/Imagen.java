package pe.gob.munisantanita.adminweb.admin.eventos.Model;

public class Imagen {

	private long id;
	private String archivo_url;
	private long evento_id;
	private String estado;
	private String mensaje;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getArchivo_url() {
		return archivo_url;
	}
	public void setArchivo_url(String archivo_url) {
		this.archivo_url = archivo_url;
	}
	public long getEvento_id() {
		return evento_id;
	}
	public void setEvento_id(long evento_id) {
		this.evento_id = evento_id;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	

	
	
	
}
