using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.enums;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Queries;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class CourseRepository : ICourseRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateCourseSp = "CourseRepository_AddOrUpdateCourse";
		private const string AddOrUpdateParticipantsListSp = "CourseRepository_AddOrUpdateParticipantsList";
		private const string AddOrUpdateUserCourseSp = "CourseRepository_AddOrUpdateUserCourse";
		private const string DeleteCourseSp = "CourseRepository_DeleteCourse";
		private const string GetUserCoursesSp = "CourseRepository_GetUserCourses";
		private const string GetUsersByCourseSp = "CourseRepository_GetUsersByCourse";
		private const string GetCoursesByQuerySp = "CourseRepository_GetCoursesByQuery";

		public CourseRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateCourse(Course course)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateCourseParam(course);
			var courseId = conn.Query<int>(AddOrUpdateCourseSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return courseId;
		}

		public void AddOrUpdateUserCourse(UserCourse userCourse)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateUserCourseParam(userCourse);
			conn.Query(AddOrUpdateUserCourseSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void AddOrUpdateParticipantsList(IReadOnlyCollection<int> participantsIds, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateParticipantsListParam(participantsIds, courseId);
			conn.Query(AddOrUpdateParticipantsListSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteCourse(int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommonCourseParam(courseId);
			conn.Query(DeleteCourseSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<UserCourse> GetUserCourses(int userId, CourseRole role)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetUserCoursesParam(userId, role);
			var userCourseUdts = conn.Query<UserCourseUdt>(GetUserCoursesSp, param, commandType: CommandType.StoredProcedure);
			var userCourses = userCourseUdts.Select(_mapper.Map<UserCourseUdt, UserCourse>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return userCourses;
		}

		public List<UserCourse> GetUsersByCourse(int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommonCourseParam(courseId);
			var userCourseUdts = conn.Query<UserCourseUdt>(GetUsersByCourseSp, param, commandType: CommandType.StoredProcedure);
			var userCourses = userCourseUdts.Select(_mapper.Map<UserCourseUdt, UserCourse>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return userCourses;
		}

		public List<Course> GetCoursesByQuery(CoursesInfoQuery query)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetCoursesParam(query);
			var courseUdts = conn.Query<CourseUdt>(GetCoursesByQuerySp, param, commandType: CommandType.StoredProcedure);
			var courses = courseUdts.Select(_mapper.Map<CourseUdt, Course>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return courses;
		}

		private DynamicTvpParameters GetAddOrUpdateCourseParam(Course course)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("course", "UDT_Course");
			var udt = _mapper.Map<Course, CourseUdt>(course);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}
		
		private DynamicTvpParameters GetAttachTeacherToCourseParam(int courseId, int teacherId)
		{
			var param = new DynamicTvpParameters();
			param.Add("courseId", courseId);
			param.Add("teacherId", teacherId);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateParticipantsListParam(IReadOnlyCollection<int> participantsIds, int courseId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("participants", "UDT_User_Course");
			var udt = participantsIds.Select(pId => new UserCourse() { UserId = pId, CourseId = courseId, CourseRole = CourseRole.Pupil });
			tvp.AddGenericList(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateUserCourseParam(UserCourse userCourse)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("userCourse", "UDT_UserCourse");
			var udt = _mapper.Map<UserCourse, UserCourseUdt>(userCourse);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetCommonCourseParam(int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("courseId", courseId);

			return param;
		}

		private DynamicTvpParameters GetGetUserCoursesParam(int userId, CourseRole courseRole)
		{
			var param = new DynamicTvpParameters();
			param.Add("userId", userId);
			param.Add("role", courseRole);

			return param;
		}

		private DynamicTvpParameters GetGetCoursesParam(CoursesInfoQuery query)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("coursesIds", "UDT_Integer");
			var udt = query.CoursesIds.Select(cId => new IntegerUdt() { Id = cId });
			tvp.AddGenericList(udt);
			param.Add(tvp);

			return param;
		}
	}
}