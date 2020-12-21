using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SuperSoft.Domain.Models;
using SuperSoft.Domain.Repositories;
using SuperSoft.Domain.Services;
using SuperSoft.ReadModels;
using SuperSoft.Services;
using SuperSoft.ViewModels;

namespace SuperSoft.Controllers
{
	public class CommentController : Controller
	{
		private readonly ICommentReaderService _commentReader;
		private readonly ICommentEditorService _commentEditor;
		private readonly MapperService _mapper;
		public CommentController(
			ICommentReaderService commentReader,
			ICommentEditorService commentEditor,
			MapperService mapper)
		{
			_commentReader = commentReader;
			_commentEditor = commentEditor;
			_mapper = mapper;
		}

		[HttpPost]
		[Route("/getcurrenttaskcommentgroup")]
		public ActionResult GetCommentGroup([FromBody]CommentGroupReadModel commentGroupReadModel)
		{
			_commentEditor.AddOrUpdateCommentGroup(commentGroupReadModel.TaskId);
			var group = _commentReader.GetCommentGroup(commentGroupReadModel.TaskId);
			var groupViewModel = MapCommentGroupViewModel(group);

			return new JsonResult(groupViewModel);
		}

		[HttpPost]
		[Route("/addorupdatecomment")]
		public ActionResult AddOrUpdateComment([FromBody]CommentReadModel commentReadModel)
		{
			var comment = _mapper.Map<CommentReadModel, Comment>(commentReadModel);
			comment.User = new User() { Id = commentReadModel.User.Id };
			comment.Id = _commentEditor.AddOrUpdateComment(commentReadModel.GroupId, comment);
			var commentViewModel = _mapper.Map<Comment, CommentViewModel>(comment);

			return new JsonResult(commentViewModel);
		}

		private CommentGroupViewModel MapCommentGroupViewModel(CommentGroup group)
		{
			var groupViewModel = _mapper.Map<CommentGroup, CommentGroupViewModel>(group);
			groupViewModel.Comments = group.Comments.Select(MapCommentViewModel).ToList();

			return groupViewModel;
		}

		private CommentViewModel MapCommentViewModel(Comment comment)
		{
			var commentViewModel = _mapper.Map<Comment, CommentViewModel>(comment);
			commentViewModel.User = _mapper.Map<User, UserViewModel>(comment.User);

			return commentViewModel;
		}
	}
}