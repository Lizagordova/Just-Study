using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Persistence.Extensions;
using SuperSoft.Persistence.Helpers;
using SuperSoft.Persistence.Models.Data;
using SuperSoft.Persistence.Models.Dto;
using SuperSoft.Persistence.Services.MapperService;

namespace SuperSoft.Persistence.Repositories
{
	public class LessonRepository : ILessonRepository
	{
		private readonly MapperService _mapper;
		private const string AddOrUpdateLessonSp = "LessonRepository_AddOrUpdateLesson";
		private const string AddOrUpdateLessonCourseSp = "LessonRepository_AddOrUpdateLessonCourse";
		private const string DeleteLessonSp = "LessonRepository_DeleteLesson";
		private const string AddOrUpdateMaterialSp = "LessonRepository_AddOrUpdateMaterial";
		private const string DeleteMaterialSp = "LessonRepository_DeleteMaterial";
		private const string GetLessonsByCourseSp = "LessonRepository_GetLessonsByCourse";
		private const string GetMaterialsByLessonSp = "LessonRepository_GetMaterialsByLesson";
		private const string GetLessonMaterialSp = "LessonRepository_GetLessonMaterial";

		public LessonRepository(
			MapperService mapper)
		{
			_mapper = mapper;
		}

		public int AddOrUpdateLesson(Lesson lesson)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateLessonParam(lesson);
			var lessonId = conn.Query<int>(AddOrUpdateLessonSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return lessonId;
		}

		public void AddOrUpdateLessonCourse(Lesson lesson, int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateLessonCourseParam(lesson, courseId);
			var lessonId = conn.Query<int>(AddOrUpdateLessonCourseSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);
		}

		public void DeleteLesson(int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetDeleteLessonParam(lessonId);
			conn.Query(DeleteLessonSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public int AddOrUpdateMaterial(LessonMaterial lessonMaterial, int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetAddOrUpdateMaterialParam(lessonMaterial, lessonId);
			var lessonMaterialId = conn.Query<int>(AddOrUpdateMaterialSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			DatabaseHelper.CloseConnection(conn);

			return lessonMaterialId;
		}

		public void DeleteMaterial(int materialId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommonMaterialParam(materialId);
			conn.Query(DeleteMaterialSp, param, commandType: CommandType.StoredProcedure);
			DatabaseHelper.CloseConnection(conn);
		}

		public List<Lesson> GetLessonsByCourse(int courseId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCourseParam(courseId);
			var response = conn.QueryMultiple(GetLessonsByCourseSp, param, commandType: CommandType.StoredProcedure);
			var data = GetLessonData(response);
			var lessons = MapLessonsList(data);
			DatabaseHelper.CloseConnection(conn);

			return lessons;
		}

		public List<LessonMaterial> GetMaterialsByLesson(int lessonId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetGetLessonsByCourseParam(lessonId);
			var lessonMaterialUdts = conn.Query<LessonMaterialUdt>(GetMaterialsByLessonSp, param, commandType: CommandType.StoredProcedure);
			var lessonMaterials = lessonMaterialUdts.Select(_mapper.Map<LessonMaterialUdt, LessonMaterial>).ToList();
			DatabaseHelper.CloseConnection(conn);

			return lessonMaterials;
		}

		public LessonMaterial GetLessonMaterial(int materialId)
		{
			var conn = DatabaseHelper.OpenConnection();
			var param = GetCommonMaterialParam(materialId);
			var lessonMaterialUdt = conn.Query<LessonMaterialUdt>(GetLessonMaterialSp, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
			var lessonMaterial = _mapper.Map<LessonMaterialUdt, LessonMaterial>(lessonMaterialUdt);
			DatabaseHelper.CloseConnection(conn);

			return lessonMaterial;
		}

		private DynamicTvpParameters GetAddOrUpdateLessonParam(Lesson lesson)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("lesson", "UDT_Lesson");
			var udt = _mapper.Map<Lesson, LessonUdt>(lesson);
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateLessonCourseParam(Lesson lesson, int courseId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("lessonCourse", "UDT_Lesson_Course");
			var udt = _mapper.Map<Lesson, LessonCourseUdt>(lesson);
			udt.CourseId = courseId;
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetDeleteLessonParam(int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("lessonId", lessonId);

			return param;
		}

		private DynamicTvpParameters GetCourseParam(int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("courseId", courseId);

			return param;
		}

		private DynamicTvpParameters GetAddOrUpdateMaterialParam(LessonMaterial lessonMaterial, int lessonId)
		{
			var param = new DynamicTvpParameters();
			var tvp = new TableValuedParameter("lessonMaterial", "UDT_LessonMaterial");
			var udt = _mapper.Map<LessonMaterial, LessonMaterialUdt>(lessonMaterial);
			udt.LessonId = lessonId;
			tvp.AddObjectAsRow(udt);
			param.Add(tvp);

			return param;
		}

		private DynamicTvpParameters GetGetLessonsByCourseParam(int courseId)
		{
			var param = new DynamicTvpParameters();
			param.Add("courseId", courseId);

			return param;
		}

		private DynamicTvpParameters GetGetMaterialsByLessonParam(int lessonId)
		{
			var param = new DynamicTvpParameters();
			param.Add("lessonId", lessonId);

			return param;
		}

		private DynamicTvpParameters GetCommonMaterialParam(int materialId)
		{
			var param = new DynamicTvpParameters();
			param.Add("materialId", materialId);

			return param;
		}
		
		private LessonData GetLessonData(SqlMapper.GridReader reader)
		{
			var data = new LessonData()
			{
				Lessons = reader.Read<LessonUdt>().ToList(),
				LessonsCourses = reader.Read<LessonCourseUdt>().ToList()
			};

			return data;
		}

		private List<Lesson> MapLessonsList(LessonData data)
		{
			var lessons = data.Lessons
				.Join(data.LessonsCourses,
					l => l.Id,
					lc => lc.LessonId,
					MapLesson)
				.ToList();

			return lessons;
		}

		private Lesson MapLesson(LessonUdt lessonUdt, LessonCourseUdt lessonCourseUdt)
		{
			var lesson = _mapper.Map<LessonCourseUdt, Lesson>(lessonCourseUdt);
			lesson.Name = lessonUdt.Name;
			lesson.Description = lessonUdt.Description;
			lesson.Id = lessonUdt.Id;

			return lesson;
		}
	}
}