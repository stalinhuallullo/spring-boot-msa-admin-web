package pe.gob.munisantanita.adminweb.admin.noticias.model;

import java.util.List;

public class ResponseNoticia {
	
	private int draw;
	private int iTotalDisplayRecords;
	private int iTotalRecords;
	
	private List<Noticia> aaData;
	
	
	
	public int getDraw() {
		return draw;
	}
	public void setDraw(int draw) {
		this.draw = draw;
	}
	public int getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}
	public void setiTotalDisplayRecords(int iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}
	public int getiTotalRecords() {
		return iTotalRecords;
	}
	public void setiTotalRecords(int iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}
	public List<Noticia> getAaData() {
		return aaData;
	}
	public void setAaData(List<Noticia> aaData) {
		this.aaData = aaData;
	}	
		
}
