/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { ICrud, ITask } from '../interfaces';
import { Task } from '../models';

/**
 *
 * The repository of tasks
 * @class TaskRepository
 * @implements {ICrud<ITask, string>}
 */
class TaskRepository implements ICrud<ITask, string> {
  /**
   *
   *
   * @param {ITask} task - The task to create
   * @return {Promise<ITask>}  A task created
   * @memberof TaskRepository
   */
  async create(task: ITask): Promise<ITask> {
    return task.save();
  }

  /**
   *
   *
   * @return {Promise<Array<ITask>>}  A list of tasks
   * @memberof TaskRepository
   */
  async list(): Promise<Array<ITask>> {
    return Task.find({});
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @return {Promise<ITask>}  A task
   * @memberof TaskRepository
   */
  async getById(id: string): Promise<ITask | null> {
    return Task.findById(id);
  }

  /**
   *
   *
   * @param {ITask} task - The task to remove
   * @return {Promise<ITask>}  A task removed
   * @memberof TaskRepository
   */
  async remove(task: ITask): Promise<ITask> {
    if (task._id) await task.remove();
    return task;
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @return {Promise<ITask>}  A task removed
   * @memberof TaskRepository
   */
  async removeById(id: string): Promise<ITask | null> {
    const taskToDelete = await this.getById(id);
    if (taskToDelete) await taskToDelete.remove();
    return taskToDelete;
  }

  /**
   *
   *
   * @param {ITask} task - The task to updated
   * @return {Promise<ITask>}  A task updated
   * @memberof TaskRepository
   */
  async update(task: ITask): Promise<ITask> {
    if (task._id) await task.update();
    return task;
  }

  /**
   *
   *
   * @param {string} id - The id to find
   * @param {ITask} task - The task to updated
   * @return {Promise<ITask>} A task updated
   * @memberof TaskRepository
   */
  async updateById(id: string, task: ITask): Promise<ITask | null > {
    const taskToUpdate = await this.getById(id);
    if (taskToUpdate) {
      taskToUpdate.title = task.title;
      await taskToUpdate.update();
    }
    return taskToUpdate;
  }
}
export default new TaskRepository();
