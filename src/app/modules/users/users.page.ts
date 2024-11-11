import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Members } from 'src/app/models/Members.model';
import { AuthService } from 'src/app/service/auth.service';
import { AddMembersPage } from './add-members/add-members.page';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit{

  filteredUsers: Members[] = [];
  searchTerm = '';
  segmentValue: string = 'miembros';
  members: Members[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private membersService: MembersService) {}

  ngOnInit() {
    this.loadMembers();
  }
  
  /**
   * Carga todos los miembros y aplica el filtro actual.
  */
  loadMembers() {
    this.membersService.getMembers().subscribe(members => {
      this.members = members;
      this.filterUsers();
    });
  }

  /**
   * Filtra la lista de miembros por segmento y término de búsqueda.
  */
  filterUsers() {
    this.filteredUsers = this.members.filter(user =>
      user.role === this.segmentValue &&
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /**
   * Cambia el segmento y actualiza el filtro de miembros.
   * @param event - Evento del cambio de segmento.
  */
  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
    this.filterUsers();
  }

  /**
    * Abre un modal para agregar un nuevo miembro.
  */
  async addNewUser() {
    const modal = await this.modalController.create({
      component: AddMembersPage,
    });
    return await modal.present();
  }

  /**
   * Importa miembros de una fuente externa.
  */
  importMembers() {

  }

  /**
   * Exporta la lista de miembros.
  */
  exportMembers() {

  }

  openFilters(event: CustomEvent) {
    const selectedValue = event.detail.value;
    console.log('Filtro seleccionado:', selectedValue);
  }
  
  /**
   * Abre el formulario de edición para un miembro.
   * @param member - Miembro a editar.
  */
  editMember(member: Members) {

  }

  /**
   * Elimina un miembro de la lista.
   * @param member - Miembro a eliminar.
  */
  deleteMember(member: Members) {

  }


  /**
   * Navega a la página de perfil del miembro.
   * @param member - Miembro a mostrar en el perfil.
  */
  profileMember(member:Members) {
    this.router.navigate([`/users/member-profile/${member.id}`]);
  }  

}
