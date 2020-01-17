package pe.gob.munisantanita.adminweb.admin.noticias.model;

public class Imagen {

	private long id;
	private String archivo_url;
	private long noticia_id;
	private String estado;
	private String mensaje;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public long getNoticia_id() {
		return noticia_id;
	}
	public void setNoticia_id(long noticia_id) {
		this.noticia_id = noticia_id;
	}
	public String getArchivo_url() {
		return archivo_url;
	}
	public void setArchivo_url(String archivo_url) {
		this.archivo_url = archivo_url;
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
