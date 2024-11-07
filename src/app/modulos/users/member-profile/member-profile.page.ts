import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Members } from 'src/app/models/Members.model';
import { MembersService } from 'src/app/service/members.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.page.html',
  styleUrls: ['./member-profile.page.scss'],
})
export class MemberProfilePage implements OnInit {

  member: Members | undefined;

  constructor(
    private membersService: MembersService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadMemberData();
  }

  loadMemberData() {
    // Obtener el id del miembro desde la URL
    this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const memberId = params.get('id');
        if (memberId) {
          return this.membersService.getMemberById(memberId);
        } else {
          throw new Error('ID del miembro no encontrado');
        }
      })
    ).subscribe({
      next: (data: Members | undefined) => {
        this.member = data;  // Asigna los datos del miembro
        console.log('Miembro recibido:', this.member);
      },
      error: (error) => {
        console.error('Error al cargar los detalles del miembro:', error);
      },
      complete: () => {
        console.log('Carga de datos completada');
      }
    });
  }  

}
