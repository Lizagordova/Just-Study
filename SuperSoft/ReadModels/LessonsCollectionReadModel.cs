using System.Collections.Generic;
using SuperSoft.Configuration.Typings.Attributes;

namespace SuperSoft.ReadModels
{
    [ApiReadModel]
    public class LessonsCollectionReadModel
    {
        public List<LessonReadModel> Lessons { get; set; } = new List<LessonReadModel>();
        public int CourseId { get; set; }
    }
}