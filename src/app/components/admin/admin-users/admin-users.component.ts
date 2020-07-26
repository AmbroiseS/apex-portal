import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service'
import { ApiUser, Status } from 'src/app/models/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: ApiUser[] = [];
  searchedUsers: ApiUser[] = [];
  searchInput: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
     this.userService.users$.subscribe(item => {
      this.users = item;
      this.searchedUsers = this.users;
      console.log(item);
    }) 
  }

  search(event) {
    let search = event.trim().toLowerCase();
    if (search == "") {
      this.searchedUsers = this.users;
      return
    }
    let userss = this.users.map(i => i);

    let searchByEmail = userss.filter(it => it.googleUser.email.toLowerCase().indexOf(search) > -1);
    let searchByDisplayName = userss.filter(it => it.apexUser?.displayedName.toLowerCase().indexOf(search) > -1);

    this.searchedUsers = Array.from(new Set(searchByEmail.concat(searchByDisplayName)));
  }

  displayStatus(y: Status) {
    switch (y) {
      case Status.PENDING:
        return "Pending"
      case Status.APPROVED:
        return "Approved"
      case Status.DENIED:
        return "Denied"
    }


  }

}
