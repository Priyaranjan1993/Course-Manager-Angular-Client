import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  courseId;
  dataForCourse;
  dataForModules;
  dataForLessons;
  widgetList;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.dataForCourse = this.courseService.courseDetails.filter(data => data.id == this.courseId);
    this.dataForModules = this.dataForCourse[0].modules;
  }

  showWidgets(lessonId) {
    this.courseService.fetchWidgets(lessonId)
      .then(data => {
        console.log('widget data -- ' + data);
        this.widgetList = data;
      });
  }

}
