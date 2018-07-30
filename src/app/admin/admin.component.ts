import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Section {
  sectionName: string;
  maxSeats: number;
  availableSeats: number;
  courseId: number;
  _id: string;
}


export interface DialogData {
  sectionName: string;
  maxSeats: number;
  availableSeats: number;
  courseId: number;
  _id: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  courseList;
  updateData;
  let;
  preDataSource: Section[];
  dataSource = [];
  sectionList;
  deleteData;
  createData;
  userName;
  userId;
  defaultData = {
    availableSeats: 0,
    courseId: 0,
    maxSeats: 0,
    modalType: '',
    sectionId: '',
    sectionName: ''
  };
  currentCourseId;
  currentCourseName;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
              private userService: UserService, private router: Router,
              public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['sectionName', 'maxSeats', 'availableSeats', 'actionsColumn'];

  ngOnInit() {
    this.courseService.fetchCourses()
      .then(() => {
        this.courseList = this.courseService.courseDetails;
      })
      .then(() => {
        this.getDataSource();
      })
      .then(() => {
        this.userService.setUserName();
      })
      .then(() => {
        this.checkUserExists();
      });
  }

  navigateProfile() {
    this.router.navigate(['/profile', {username: this.userService.userName}]);
  }

  checkUserExists() {
    this.userService.getUserId()
      .then(data => {
        if (data !== null) {
          this.userName = data.userName;
          this.userId = data._id;
          console.log('Username --- ' + this.userName);
        } else {
          this.userName = '';
        }

      });
  }

  getDataSource() {
    this.courseList.forEach((val) => {
      console.log(val.id);
      this.getSectionForCourse(val.id);
    });
  }

  getSectionForCourse(courseId) {
    this.courseService.fetchSectionForCourse(courseId)
      .then(data => {
        this.sectionList = data;
      })
      .then(() => {
        console.log(this.sectionList);
        this.preDataSource = this.sectionList;
        this.dataSource[courseId] = this.preDataSource;
        return this.dataSource;
      });
  }

  logout() {
    this.userService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      });
  }

  createSection(courseId, courseName) {
    this.currentCourseId = courseId;
    this.currentCourseName = courseName;
    const newDialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: {
        sectionName: '', maxSeats: '',
        availableSeats: '', courseId: courseId,
        sectionId: '', modalType: 'new'
      }
    });

    newDialogRef.afterClosed().subscribe(result => {
      console.log('Add dialog was closed');
      if (result !== undefined && result.sectionName !== '') {
        this.createData = result;
        console.log(this.createData);
        this.courseService.addSectionForCourse(courseId, result)
          .then(response => {
            console.log(response);
            this.getDataSource();
          });
      } else if (result.sectionName === '') {
        this.defaultData.availableSeats = 1;
        this.defaultData.courseId = this.currentCourseId;
        this.defaultData.maxSeats = 1;
        this.defaultData.sectionName = this.currentCourseName + ' Section 1';
        this.defaultData.sectionId = '';
        this.defaultData.modalType = 'new';

        console.log(this.defaultData);
        this.courseService.addSectionForCourse(courseId, this.defaultData)
          .then(response => {
            console.log(response);
            this.getDataSource();
          });
      }

    });
  }

  deleteSection(row) {
    const deleteDialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '300px',
      data: {
        sectionName: row.sectionName, maxSeats: row.maxSeats,
        availableSeats: row.availableSeats, courseId: row.courseId,
        sectionId: row._id, modalType: 'delete'
      }
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      console.log('Delete dialog was closed');
      if (result !== undefined) {
        this.deleteData = result;
        console.log(this.deleteData);
        this.courseService.deleteSectionForCourse(result.sectionId)
          .then(response => {
            console.log(response);
            this.getDataSource();
          });
      }

    });

  }

  editSection(row): void {
    const editDialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '400px',
      data: {
        sectionName: row.sectionName, maxSeats: row.maxSeats,
        availableSeats: row.availableSeats, courseId: row.courseId,
        sectionId: row._id, modalType: 'edit'
      }
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('Edit dialog was closed');
      if (result !== undefined) {
        this.updateData = result;
        console.log(this.updateData);
        this.courseService.updateSectionForCourse(result.sectionId, result)
          .then(response => {
            console.log(response);
            this.getDataSource();
          });
      }

    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./admin.component.css']
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
